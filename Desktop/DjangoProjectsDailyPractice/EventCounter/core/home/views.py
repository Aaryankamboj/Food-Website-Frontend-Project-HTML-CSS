from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from .models import Event

# Create your views here.
def index(request):
    return HttpResponse("Hi")


def countdown_timer(request):
    event = Event.objects.first()

    if event:
        time_remain = event.event_date - timezone.now()
        hours = time_remain.seconds // 3600
        mins = (time_remain.seconds % 3600) // 60
        seconds = time_remain.seconds % 60

        params={
            'name':event.name,
            'hours':hours,
            'mins':mins,
            'seconds':seconds 
        }
    else:
         params={
            'name': "No Event",
            'hours': 0,
            'mins': 0,
            'seconds': 0
        }
    
    return render(request, 'index.html', {'data':params})


