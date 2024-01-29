import uuid
from django.db import models


class NoteModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.CharField(max_length=255, unique=False)
    Topic = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, unique=False)
    timestamped = models.CharField(max_length=255, null=True, blank=True, default=0)
    currentTime = models.FloatField(null=True, blank=True, default=0)
    content = models.TextField(blank=True)
    copied = models.TextField(blank=True)
    snaped = models.ImageField(upload_to ='uploads/', blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "notes"
        ordering = ['-createdAt']

        def __str__(self) -> str:
            return self.title