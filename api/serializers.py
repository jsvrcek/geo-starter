from rest_framework_gis.serializers import GeoFeatureModelSerializer
from api.models import Feature


class FeatureSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'
        geo_field = "geometry"
