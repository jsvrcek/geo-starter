from setuptools import setup, find_packages

setup(
    name='geostarter',
    version='1.0.0',
    packages=find_packages(),
    install_requires=[
        "django==5.0.3",
        "djangorestframework-gis==1.0",
        "gunicorn==21.2.0",
        "whitenoise==6.6.0"
    ],
    entry_points={
        'console_scripts': [
        ],
    },
)
