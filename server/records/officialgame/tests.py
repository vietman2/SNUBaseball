from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from person.user.models import User
from records.officialgame.models import Game, MyGamePlayer, MyTeam, TournamentEvent

class ResultsAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/people.json", "core/data/test/game.json",
        "core/data/initial/records_2024.json", "core/data/initial/majors.json",
    ]

    def setUp(self):
        self.url = '/v1/results/'
        self.user = User.objects.get(username='testuser_1')

    def test_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url, {'year': 2024})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_detail(self):
        self.client.force_authenticate(user=self.user)
        ## with detailed data
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## without detailed data
        response = self.client.get(f'{self.url}2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TeamsAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/people.json", "core/data/test/game.json",
        "core/data/initial/records_2024.json", "core/data/initial/majors.json",
    ]

    def setUp(self):
        self.url = '/v1/teams/'
        self.user = User.objects.get(username='testuser_1')

    def test_unallowed_method(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_team_detail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url, {'year': 2024})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_team_detail_fail(self):
        self.client.force_authenticate(user=self.user)
        ## 1. not number
        response = self.client.get(self.url, {'year': 'not_number'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 2. not exist
        response = self.client.get(self.url, {'year': 1})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ModelsTestCase(TestCase):
    fixtures = [
        "core/data/test/people.json", "core/data/test/game.json",
        "core/data/initial/records_2024.json", "core/data/initial/majors.json",
    ]

    def test_game_str(self):
        game = Game.objects.get(pk=1)
        self.assertEqual(str(game), '24 신안산대전')

    def test_mygameplayer_str(self):
        mygameplayer = MyGamePlayer.objects.get(pk=1)
        self.assertEqual(str(mygameplayer), '24 정승원 (24 신안산대전)')

    def test_myteam_str(self):
        myteam = MyTeam.objects.get(pk=1)
        self.assertEqual(str(myteam), '24 서울대')

    def test_tournamentevent_str(self):
        tournamentevent = TournamentEvent.objects.get(pk=1)
        self.assertEqual(str(tournamentevent), '2024 2024 KUSF 대학야구 U-리그 B조')
