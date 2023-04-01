from rest_framework import serializers
from node_api.models import NoteModel


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteModel
        fields = '__all__'