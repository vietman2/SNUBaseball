from django.urls import path

from .teams.api import RosterAPIView, RosterMemberAPIView

urlpatterns = [
    path("v1/teams/", RosterAPIView.as_view(), name="team_roster"),
    path(
        "v1/teams/members/<int:member_id>/",
        RosterMemberAPIView.as_view(),
        name="team_roster_member",
    ),
]
