import json
import boto3
import time

quicksight = boto3.client('quicksight')

# Function to check if a QuickSight Namespace exists for a company and creates one if it does not exist.
def check_namespace(aws_account_id, company):
    try:
        response = quicksight.describe_namespace(
            AwsAccountId=aws_account_id,
            Namespace=company
        )

        retries = 0
        
        while response['Namespace']['CreationStatus'] != "CREATED":
            response = quicksight.describe_namespace(
                AwsAccountId=aws_account_id,
                Namespace=company
            )
            retries += 1

            time.sleep(1.5 * retries)
            
    except Exception as e:
            raise Exception("Lambda GetQuickSightResponse.checkNameSpace function:" + str(e))

    return response

# Function to register the Cognito user in QuickSight in the specified namespace.
#TODO: Small wrapper over a try catch + API call, move out of a function.
def register_user(aws_account_id, email, company, quicksight_role):
    try:
        response = quicksight.register_user(
            AwsAccountId=aws_account_id,
            Namespace=company,
            IdentityType="IAM",
            IamArn=f"arn:aws:iam::{aws_account_id}:role/oktank-{company}",
            SessionName=email,
            Email=email,
            UserRole=quicksight_role,
            ExternalLoginFederationProviderType="COGNITO",
            ExternalLoginId=email,
            CustomPermissionsName='pbq-tenant'
        )

        response = quicksight.create_group_membership(
            MemberName=f"oktank-{company}/{email}",
            GroupName=company,
            AwsAccountId=aws_account_id,
            Namespace=company
        )
        
        return response
    except quicksight.exceptions.ResourceExistsException as e:
        return str(e)
    except Exception as e:
        raise Exception("Lambda GetQuickSightResponse.registerUser function:" + str(e))

# Call the generate_embed_url_for_registered_user API, depending on the embed type (Dashboard, Console)
def generate_q_embed_url(aws_account_id, get_user_arn_response):
    try:
        response = quicksight.generate_embed_url_for_registered_user(
            AwsAccountId=aws_account_id,
            SessionLifetimeInMinutes=30,
            UserArn=get_user_arn_response,
            ExperienceConfiguration={
                "QSearchBar": {},
            },
        )
    except Exception as e:
        raise Exception("Lambda UserBasedURL.getEmbedUrl function: " + str(e))

    return response

def get_user_arn(aws_account_id, email, company):
    try:
        response = quicksight.describe_user(
            UserName=f"oktank-{company}/" + email,
            AwsAccountId=aws_account_id,
            Namespace=company,
        )
        return response["User"]["Arn"]
    except Exception as e:
        raise Exception(
            "Lambda GetQuickSightResponse.getUserArn function:" + str(e)
        )

def handler(event, context):
    print(event)

    aws_account_id = context.invoked_function_arn.split(":")[4]

    email = event["arguments"]["openIdToken"]["payload"]["email"]
    company_name = event["arguments"]["openIdToken"]["payload"]["custom:company"]
    
    # Determine what QuickSight Role newly created user will get.
    # "Admin" and "Author" are provisioned as QuickSight Authors. "Reader" is provisioned as QuickSight Reader.
    if event["arguments"]["openIdToken"]["payload"]["custom:role"].lower() == "author":
        quicksight_role = "AUTHOR"
    else:
        quicksight_role = "READER"

    # Main logic of handler
    try:
            check_namespace_response = check_namespace(aws_account_id, company_name)
            register_user_response = register_user(aws_account_id, email, company_name, quicksight_role)
            get_user_arn_response = get_user_arn(aws_account_id, email, company_name)
            get_embed_url_response = generate_q_embed_url(aws_account_id, get_user_arn_response)

            return json.dumps(
                {
                    "UserArn": get_user_arn_response,
                    "UserRegistration": register_user_response,
                    "EmbedUrl": get_embed_url_response,
                    "Namespace": check_namespace_response
                }
            )
    except Exception as e:
        raise Exception("Lambda GetQuickSightResponse.handler function:" + str(e))
