def get_status_obj(feedback):
    if feedback.status == 0:
        return {
            'label': '신규',
            'color': '#E53935',
            'background_color': '#FEE4E2'
        }
    elif feedback.status == 1:
        return {
            'label': '진행중',
            'color': '#F57C00',
            'background_color': '#FFF7D6'
        }
    elif feedback.status == 2:
        return {
            'label': '검토중',
            'color': '#1565C0',
            'background_color': '#E3F2FD'
        }
    else:
        return {
            'label': '완료',
            'color': '#4A8A34',
            'background_color': '#E8FFD1'
        }

def get_status(query):
    if query == '신규':
        return 0
    elif query == '진행중':
        return 1
    elif query == '검토중':
        return 2
    else:
        return 3
