from person.member.enums import RoleType

def is_admin(user):
    if user.is_superuser:
        return True

    admin_roles = [RoleType.MANAGER, RoleType.CAPTAIN, RoleType.VICE_CAPTAIN, RoleType.HEAD_MANAGER]

    if user.member.role in admin_roles:
        return True

    return False
