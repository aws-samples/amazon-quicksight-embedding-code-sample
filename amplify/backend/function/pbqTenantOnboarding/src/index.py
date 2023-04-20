import json
import os
import boto3
import time
from botocore.exceptions import ClientError

# This function will create an IAM role for each tenant, which will be used when registering the user within QuickSight
# This function will also pre-populate the namespace for each tenant, so that the namespace is created in advance

iam = boto3.client("iam")
quicksight = boto3.client("quicksight")

def create_tenant_iam_role(aws_account_id, aws_region, userpool_id, company_name):
    # Define a standard IAM role structure so we can inject domain_name into it

    iam_role_name = f"oktank-{company_name}"

    assume_role_policy_doc = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": f"arn:aws:iam::{aws_account_id}:oidc-provider/cognito-idp.{aws_region}.amazonaws.com/{userpool_id}"
            },
            "Action": "sts:AssumeRoleWithWebIdentity"
        }

    ],
    }

    try:
        response = iam.get_role(RoleName=iam_role_name)["Role"]["Arn"]
    except:
        try:
            response = iam.create_role(
                RoleName=iam_role_name,
                AssumeRolePolicyDocument=(json.dumps(assume_role_policy_doc))
            )
        except Exception as e:
            raise Exception("Lambda create_role function:" + str(e))

    return response
        
def create_namespace(aws_account_id, company_name):
    try:
        response = quicksight.describe_namespace(
            AwsAccountId=aws_account_id,
            Namespace=company_name
        )
      
    except:
        try:
            response = quicksight.create_namespace(
                AwsAccountId=aws_account_id,
                Namespace=company_name,
                IdentityStore="QUICKSIGHT",
                Tags=[{"Key": "company", "Value": company_name}],
            )
        except Exception as e:
            raise Exception("Lambda GetQuickSightResponse.createNameSpace function:" + str(e))

    retries = 0
        
    while response['Namespace']['CreationStatus'] != "CREATED":
        response = quicksight.describe_namespace(
            AwsAccountId=aws_account_id,
            Namespace=company_name
        )
        retries += 1

        time.sleep(1.5 * retries)

    return response

def create_group(aws_account_id, company_name):
    try:
        response = quicksight.create_group(
            GroupName=company_name,
            Description=f'Default group for {company_name}',
            AwsAccountId=aws_account_id,
            Namespace=company_name
        )
    except Exception as e:
        raise Exception("Lambda GetQuickSightResponse.create_group function:" + str(e))

    return response

def handler(event, context):
    print(event)

    aws_account_id = context.invoked_function_arn.split(":")[4]
    aws_region = os.environ['AWS_REGION']
    userpool_id = os.environ['AUTH_POWEREDBYQUICKSIGHTD245D0359_USERPOOLID']
    company_name = event['arguments']['company_name']

    iam_response = create_tenant_iam_role(aws_account_id, aws_region, userpool_id, company_name)
    namespace_response = create_namespace(aws_account_id, company_name)
    group_response = create_group(aws_account_id, company_name)

    print(iam_response)
    print(namespace_response)

    return json.dumps(
                {
                    "IamResponse": iam_response,
                    "NamespaceResponse": namespace_response,
                    "GroupResponse": group_response
                }, indent = 4, sort_keys = True, default = str
            )
