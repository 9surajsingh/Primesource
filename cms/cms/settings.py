import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-dev-key-change-in-production-12345'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    # Modern Django Admin
    'unfold',
    'unfold.contrib.filters',
    'unfold.contrib.forms',
    
    # Core Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # App
    'core',
    'django_ckeditor_5',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cms.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cms.wsgi.application'

# Database Connection to Shared PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'primesource',
        'USER': 'primesource',
        'PASSWORD': 'primesource_dev_2024',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media Files - Map directly to Next.js Public Folder for file sharing
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR.parent / 'public' / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Custom Unfold theme styling configurations
UNFOLD = {
    "SITE_TITLE": "PrimeSource CMS Admin",
    "SITE_HEADER": "PrimeSource CMS Dashboard",
    "SITE_SYMBOL": "speedometer",
    "SHOW_HISTORY": True,
    "SHOW_SIDEBAR_FILTER": True,
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
        "navigation": [
            {
                "title": "Site Content Management",
                "items": [
                    {
                        "title": "Homepage Settings",
                        "icon": "home",
                        "link": "/admin/core/homepagecontent/",
                    },
                    {
                        "title": "Blog Posts",
                        "icon": "article",
                        "link": "/admin/core/blogpost/",
                    },
                    {
                        "title": "Case Studies",
                        "icon": "folder_shared",
                        "link": "/admin/core/casestudy/",
                    },
                    {
                        "title": "Services",
                        "icon": "settings",
                        "link": "/admin/core/service/",
                    },
                    {
                        "title": "Industries",
                        "icon": "domain",
                        "link": "/admin/core/industry/",
                    },
                ]
            },
            {
                "title": "Operations & Careers",
                "items": [
                    {
                        "title": "Job Board",
                        "icon": "work",
                        "link": "/admin/core/job/",
                    },
                    {
                        "title": "Job Applications",
                        "icon": "people",
                        "link": "/admin/core/jobapplication/",
                    },
                    {
                        "title": "Client Reviews",
                        "icon": "reviews",
                        "link": "/admin/core/testimonial/",
                    },
                    {
                        "title": "Contacts / Leads",
                        "icon": "mail",
                        "link": "/admin/core/contact/",
                    },
                    {
                        "title": "Newsletter Subs",
                        "icon": "alternate_email",
                        "link": "/admin/core/newsletter/",
                    },
                ]
            },
            {
                "title": "SEO & Assets",
                "items": [
                    {
                        "title": "Page SEO Configs",
                        "icon": "search",
                        "link": "/admin/core/pageseo/",
                    },
                    {
                        "title": "Centralized Media",
                        "icon": "image",
                        "link": "/admin/core/media/",
                    },
                ]
            }
        ]
    }
}

# CKEditor 5 configuration
CKEDITOR_5_UPLOAD_PATH = "uploads/ckeditor/"
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': [
            'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', 'code', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'outdent', 'indent', '|', 'blockQuote', 'insertTable', 'link', 'imageUpload', 'mediaEmbed', 'codeBlock', '|',
            'fontSize', 'fontColor', 'fontBackgroundColor', '|',
            'undo', 'redo', 'removeFormat', 'sourceEditing'
        ],
        'image': {
            'toolbar': ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
            'styles': ['full', 'side', 'alignLeft', 'alignCenter', 'alignRight']
        },
        'table': {
            'contentToolbar': ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        'heading': {
            'options': [
                {'model': 'paragraph', 'title': 'Paragraph', 'class': 'ck-heading_paragraph'},
                {'model': 'heading1', 'view': 'h1', 'title': 'Heading 1', 'class': 'ck-heading_heading1'},
                {'model': 'heading2', 'view': 'h2', 'title': 'Heading 2', 'class': 'ck-heading_heading2'},
                {'model': 'heading3', 'view': 'h3', 'title': 'Heading 3', 'class': 'ck-heading_heading3'},
                {'model': 'heading4', 'view': 'h4', 'title': 'Heading 4', 'class': 'ck-heading_heading4'},
            ]
        },
        'htmlSupport': {
            'allow': [
                {
                    'name': '/.*/',
                    'attributes': True,
                    'classes': True,
                    'styles': True
                }
            ]
        }
    }
}

