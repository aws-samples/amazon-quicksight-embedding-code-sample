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

    dashboard_id = os.environ['DashboardId']
    sheet_id = os.environ['SheetId']
    visual_id = os.environ['VisualId']

    tag_key = "company_name"
    tag_value = event['arguments']['tag_value']

    dashboard_arn = ['arn:aws:quicksight:' + aws_region + ':' + aws_account_id + ':dashboard/'+ dashboard_id]

    response = generate_visual_embed_url(
        aws_account_id,
        dashboard_id,
        sheet_id,
        visual_id,
        dashboard_arn,
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
        'embed_url': response
    })


# Call the generate embed url for anonymous user API
def generate_visual_embed_url(aws_account_id, dashboard_id, sheet_id, visual_id, dashboard_arn, tag_key, tag_value):
    try:
        response = quicksight.generate_embed_url_for_anonymous_user(
                AwsAccountId = aws_account_id,
                Namespace = 'default',
                ExperienceConfiguration = {'DashboardVisual':{'InitialDashboardVisualId': {"DashboardId": dashboard_id, "SheetId": sheet_id, "VisualId": visual_id}}},
                AuthorizedResourceArns = dashboard_arn,
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