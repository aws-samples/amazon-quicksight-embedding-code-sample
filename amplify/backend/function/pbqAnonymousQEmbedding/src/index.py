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

    topic_id_list = os.environ['TopicIdList'].split(',')

    tag_key = "company_name"
    tag_value = event['arguments']['tag_value']

    topic_arn_list = [ 'arn:aws:quicksight:' + aws_region + ':' + aws_account_id + ':topic/'+ topic_id for topic_id in topic_id_list]

    response = generate_q_embed_url(
        aws_account_id,
        topic_id_list,
        topic_arn_list,
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
def generate_q_embed_url(aws_account_id, topic_id_list, topic_arn_list, tag_key, tag_value):
    try:
        response = quicksight.generate_embed_url_for_anonymous_user(
                AwsAccountId = aws_account_id,
                Namespace = 'default',
                ExperienceConfiguration = {'QSearchBar':{'InitialTopicId': topic_id_list[0]}},
                AuthorizedResourceArns = topic_arn_list,
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