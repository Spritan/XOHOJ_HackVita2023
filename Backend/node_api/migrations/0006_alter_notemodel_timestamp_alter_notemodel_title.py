# Generated by Django 4.0.3 on 2023-03-31 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('node_api', '0005_alter_notemodel_timestamp_alter_notemodel_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notemodel',
            name='timestamp',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='notemodel',
            name='title',
            field=models.CharField(max_length=255),
        ),
    ]
