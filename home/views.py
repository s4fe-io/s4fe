from django.shortcuts import render

# Create your views here.



def home(request):
    context = {
        'customtext': "S4FE",
        'homepage': "S4FE"
    }
    return render(request, 'home/index.html', context)
