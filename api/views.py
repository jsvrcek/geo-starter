from rest_framework import viewsets
from api.models import Feature
from api.serializers import FeatureSerializer


class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

    # This is here ONLY for demo purposes, a real app needs authentication.
    authentication_classes = []
