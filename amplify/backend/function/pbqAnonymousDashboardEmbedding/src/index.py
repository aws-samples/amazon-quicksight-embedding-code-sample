import os
import json
import boto3
from botocore.exceptions import ClientError

quicksight = boto3.client('quicksight')

def handler(event, context):
    print('received event:')
    print(event)

    # Derive AWS Account ID from Lambda context
    aws_account_id = context.invoked_function_arn.split(":")[4]
    aws_region = os.environ['AWS_REGION']

    dashboard_id_list = os.environ['DashboardIdList'].split(',')
    dashboard_name_list = os.environ['DashboardNameList'].split(',')
    dashboard_name_id_list = [ {'Name': dashboard_name, 'DashboardId': dashboard_id} for dashboard_name, dashboard_id in zip(dashboard_name_list,dashboard_id_list)]
    tag_key = "company_name"
    tag_value = event['arguments']['tag_value']

    dashboard_arn_list = [ 'arn:aws:quicksight:' + aws_region + ':' + aws_account_id + ':dashboard/'+ dashboard_id for dashboard_id in dashboard_id_list]

    response = generate_embed_url(
        aws_account_id,
        dashboard_id_list,
        dashboard_arn_list,
        tag_key,
        tag_value
    )

    return json.dumps({
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'embed_url': response,
        'dashboard_list': dashboard_name_id_list
    })


# Call the generate embed url for anonymous user API
def generate_embed_url(aws_account_id, dashboard_id_list, dashboard_arn_list, tag_key, tag_value):
    # lambdaRegion = os.environ['AWS_REGION']

    try:
        response = quicksight.generate_embed_url_for_anonymous_user(
                AwsAccountId = aws_account_id,
                Namespace = 'default',
                ExperienceConfiguration = {'Dashboard':{'InitialDashboardId': dashboard_id_list[0]}},
                AuthorizedResourceArns = dashboard_arn_list,
                SessionLifetimeInMinutes = 60,
                SessionTags=[{'Key': tag_key,'Value': tag_value}]
             )
        return response
    except ClientError as e:
        return {'statusCode':400,
                'headers': {"Access-Control-Allow-Origin": "-",
                            "Content-Type":"text/plain"},
                'body':json.dumps('Error: ' + str(e))
                }     