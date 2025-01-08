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
        self.create_data = {
            'year': 2023,
            'professor': '김교수',
            'head_coach': '이감독',
            'head_manager': '박매니저',
            'captain': '정주장',
            'vice_captain': '박부주장',
        }

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

    def test_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f'{self.url}', self.create_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_fail(self):
        ## 1. year already exists
        self.client.force_authenticate(user=self.user)
        data = self.create_data.copy()
        data['year'] = 2024
        response = self.client.post(f'{self.url}', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_players(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}players/', {'year': 2025})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_players_fail(self):
        self.client.force_authenticate(user=self.user)
        ## 1. not exist
        response = self.client.get(f'{self.url}players/', {'year': 1})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        ## 2. no parameter
        response = self.client.get(f'{self.url}players/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_player_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f'{self.url}player/', {
            'year': 2025,
            'member_id': 1,
            'role': '지도자',
            'back_number': 1,
            'is_registered': False,
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.client.post(f'{self.url}player/', {
            'year': 2025,
            'member_id': 2,
            'role': '매니저',
            'back_number': 2,
            'is_registered': False,
        })

        self.client.post(f'{self.url}player/', {
            'year': 2025,
            'member_id': 3,
            'role': '주장',
            'back_number': 3,
            'is_registered': True,
        })

        self.client.post(f'{self.url}player/', {
            'year': 2025,
            'member_id': 4,
            'role': '부주장',
            'back_number': 4,
            'is_registered': True,
        })

        self.client.post(f'{self.url}player/', {
            'year': 2025,
            'member_id': 5,
            'role': '수석매니저',
            'back_number': 5,
            'is_registered': False,
        })

        self.client.post(f'{self.url}player/', {
            'year': 2025,
            'member_id': 6,
            'role': '선수',
            'back_number': 6,
            'is_registered': True,
        })

    def test_player_create_fail(self):
        self.client.force_authenticate(user=self.user)
        ## 1. not exist
        response = self.client.post(f'{self.url}player/', {
            'year': 1,
            'member_id': 1,
            'role': '투수',
            'back_number': 1,
            'is_registered': False,
        })
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        ## 2. not exist member
        response = self.client.post(f'{self.url}player/', {
            'year': 2024,
            'member_id': 1000,
            'role': '투수',
            'back_number': 1,
            'is_registered': False,
        })
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        ## 3. no parameter
        response = self.client.post(f'{self.url}player/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

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
