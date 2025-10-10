from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class MediaPageNumberPagination(PageNumberPagination):
    page_size = 50
    page_query_param = "page"
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_paginated_response(self, data):
        page_size = self.get_page_size(self.request) or self.page.paginator.per_page

        return Response(
            {
                "count": self.page.paginator.count,
                "pages": self.page.paginator.num_pages,
                "page": self.page.number,
                "page_size": page_size,
                "results": data,
            }
        )
