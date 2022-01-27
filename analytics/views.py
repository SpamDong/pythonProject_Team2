from django.shortcuts import render
from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from django.shortcuts import render
from pyowm import OWM
import json

SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
KEY_FILE_LOCATION = 'C:/Users/slinfo/PycharmProjects/pythonProject_Team2/analytics/pythonproject-team2-b154a2581bc9.json'
VIEW_ID = '259138517'


def initialize_analyticsreporting():
    """Initializes an Analytics Reporting API V4 service object.

  Returns:
    An authorized Analytics Reporting API V4 service object.
  """
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        KEY_FILE_LOCATION, SCOPES)

    # Build the service object.
    analytics = build('analyticsreporting', 'v4', credentials=credentials)

    return analytics


def get_report(analytics):
    """Queries the Analytics Reporting API V4.

  Args:
    analytics: An authorized Analytics Reporting API V4 service object.
  Returns:
    The Analytics Reporting API V4 response.
  """
    return analytics.reports().batchGet(
        body={
            'reportRequests': [
                {
                    'viewId': VIEW_ID,
                    'dateRanges': [{'startDate': '30daysAgo', 'endDate': 'today'}],
                    'metrics': [{'expression': 'ga:pageviews'}],
                    'dimensions': []
                }]
        }
    ).execute()


def get_visitors(response):
    visitors = 0  # in case there are no analytics available yet
    for report in response.get('reports', []):
        columnHeader = report.get('columnHeader', {})
        metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])

        for row in report.get('data', {}).get('rows', []):
            dateRangeValues = row.get('metrics', [])

            for i, values in enumerate(dateRangeValues):
                for metricHeader, value in zip(metricHeaders, values.get('values')):
                    visitors = value

    return str(visitors)


def dashboard(request):
    analytics = initialize_analyticsreporting()
    response = get_report(analytics)
    visitors = get_visitors(response)
    print(visitors)

    API_key = '1b2e17a15b425623d7106d443cf4ed5b'
    owm = OWM(API_key)
    mgr = owm.weather_manager()

    weather = mgr.weather_at_place('Seoul,KR').weather  # the observation object is a box containing a weather object
    temp_dict_celsius = weather.temperature('celsius')  # guess?
    print('********************************************************')
    print(weather)  # short version of status (eg. 'Rain')
    print(temp_dict_celsius['temp'])



    return render(request, 'main_post/main_post.html', {'visitors': visitors, 'weather' : weather.status, 'temp' : temp_dict_celsius['temp']})
