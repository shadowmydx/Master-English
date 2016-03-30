

class SessionGenerator:
    runtime_session = dict()

    def __init__(self):
        pass

    @staticmethod
    def add_item(key, value):
        SessionGenerator.runtime_session[key] = value

    @staticmethod
    def pop_item(key):
        SessionGenerator.runtime_session.pop(key)

    @staticmethod
    def get_item(key):
        return SessionGenerator.runtime_session[key]
