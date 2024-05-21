from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

import logging

class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('token')
        logging.debug(f'Received token from cookie: ${token}')
        if not token:
            return None
        
        try:
            user, auth_token = self.authenticate_credentials(token)
            logging.debug(f'Authenticated user: {user}')
        except AuthenticationFailed:
            logging.debug('Failed to authenticate token')
            return None