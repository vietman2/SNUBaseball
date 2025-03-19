from django.conf import settings

def is_team_page(request):
    team_page_url = settings.TEAM_PAGE_URL
    return request.META.get('HTTP_ORIGIN') == team_page_url
