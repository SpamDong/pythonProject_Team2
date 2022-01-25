from django.shortcuts import render
from pyowm import OWM
import json

# Create your views here.
def main_post(request):

    API_key = '1b2e17a15b425623d7106d443cf4ed5b'
    owm = OWM(API_key)
    mgr = owm.weather_manager()

    weather = mgr.weather_at_place('Seoul,KR').weather  # the observation object is a box containing a weather object
    temp_dict_celsius = weather.temperature('celsius')  # guess?
    print('********************************************************')
    print(weather.status)  # short version of status (eg. 'Rain')
    print(temp_dict_celsius['temp'])


    return render(request, 'main_post/main_post.html', {'weather' : weather.status, 'temp' : temp_dict_celsius['temp']})

