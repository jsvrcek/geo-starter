from django.contrib.gis.db import models


class Feature(models.Model):
    name = models.CharField(max_length=255)
    geometry = models.GeometryField()
