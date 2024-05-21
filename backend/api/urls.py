from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as authTokenViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

router = DefaultRouter()
router.register(r'tasks', views.TasksViewSet, 'task')

urlpatterns = [
    path('logout/', views.logoutView, name='logout'),
    # path('login/', views.loginView, name='login'),
    # path('signup/', views.signupView, name='signup'),
    # path('getCSRFToken/', views.getCSRF, name='getCSRF'),
    # path('getSession/', views.getSession, name='getSession'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('getCSRFToken/', views.GetCSRFToken.as_view(), name='getCSRF'),
    path('getSession/', views.GetSession.as_view(), name='getSession'),

    path('jwtToken/', TokenObtainPairView.as_view(), name='jwt_token_obtain_pair'),
    path('jwtToken/refresh/', TokenRefreshView.as_view(), name="jwt_token_refresh"),
    
    path('', include(router.urls)),
]
    # path('getAuthToken/', authTokenViews.obtain_auth_token, name="getAuthToken"),
