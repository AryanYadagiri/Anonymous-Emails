# Generated by Django 5.0.1 on 2024-02-02 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0004_alter_userprofile_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='created_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
