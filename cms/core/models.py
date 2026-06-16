import random
import string
import time
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
from django_ckeditor_5.fields import CKEditor5Field

def generate_cuid():
    """Generates a CUID-like unique string compatible with Next.js/Prisma."""
    timestamp = hex(int(time.time() * 1000))[2:]
    rand = ''.join(random.choices(string.ascii_lowercase + string.digits, k=16))
    return f"c{timestamp}{rand}"

class User(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    role = models.CharField(
        max_length=50,
        choices=[('ADMIN', 'Admin'), ('EDITOR', 'Editor'), ('USER', 'User')],
        default='USER'
    )
    avatar = models.CharField(max_length=500, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        managed = False

    def __str__(self):
        return f"{self.name} ({self.email})"

class BlogPost(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    excerpt = models.CharField(max_length=500)
    content = CKEditor5Field('Content', config_name='default')
    coverImage = models.CharField(max_length=500, null=True, blank=True)

    category = models.CharField(max_length=100)
    tags = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    author = models.ForeignKey(User, db_column='authorId', on_delete=models.CASCADE, related_name='posts')
    views = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    publishedAt = models.DateTimeField(null=True, blank=True)
    
    # SEO & Related Posts
    seoTitle = models.CharField(max_length=255, null=True, blank=True)
    seoDescription = models.TextField(null=True, blank=True)
    seoKeywords = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    relatedPostIds = ArrayField(models.CharField(max_length=100), default=list, blank=True)

    class Meta:
        db_table = 'blog_posts'
        managed = False

    def __str__(self):
        return self.title

class Job(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    type = models.CharField(
        max_length=50,
        choices=[
            ('FULL_TIME', 'Full Time'),
            ('PART_TIME', 'Part Time'),
            ('CONTRACT', 'Contract'),
            ('FREELANCE', 'Freelance')
        ]
    )
    experience = models.CharField(max_length=100)
    salary = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField()
    requirements = ArrayField(models.TextField(), default=list, blank=True)
    benefits = ArrayField(models.TextField(), default=list, blank=True)
    skills = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    closingDate = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'jobs'
        managed = False

    def __str__(self):
        return f"{self.title} - {self.location}"

class JobApplication(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    job = models.ForeignKey(Job, db_column='jobId', on_delete=models.CASCADE, related_name='applications')
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50, null=True, blank=True)
    resume = models.CharField(max_length=500)
    coverLetter = models.TextField(null=True, blank=True)
    linkedIn = models.CharField(max_length=255, null=True, blank=True)
    portfolio = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ('PENDING', 'New / Pending'),
            ('REVIEWING', 'Reviewing'),
            ('SHORTLISTED', 'Interview Scheduled'),
            ('INTERVIEWED', 'Interviewed'),
            ('OFFERED', 'Offered'),
            ('HIRED', 'Hired'),
            ('REJECTED', 'Rejected')
        ],
        default='PENDING'
    )
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'job_applications'
        managed = False

    def __str__(self):
        return f"{self.firstName} {self.lastName} - {self.job.title}"

class CaseStudy(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    client = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    excerpt = models.CharField(max_length=500)
    challenge = CKEditor5Field('Challenge', config_name='default')
    solution = CKEditor5Field('Solution', config_name='default')
    results = CKEditor5Field('Results', config_name='default')
    coverImage = models.CharField(max_length=500, null=True, blank=True)

    images = ArrayField(models.CharField(max_length=500), default=list, blank=True)
    videos = ArrayField(models.CharField(max_length=500), default=list, blank=True)
    technologies = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    metrics = JSONField(null=True, blank=True, help_text="Metrics in key/value JSON: {'Metric Name': 'Value'}")
    testimonial = models.TextField(null=True, blank=True)
    testimonialAuthor = models.CharField(max_length=255, null=True, blank=True)
    testimonialRole = models.CharField(max_length=255, null=True, blank=True)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
    # SEO
    seoTitle = models.CharField(max_length=255, null=True, blank=True)
    seoDescription = models.TextField(null=True, blank=True)
    seoKeywords = ArrayField(models.CharField(max_length=100), default=list, blank=True)

    class Meta:
        db_table = 'case_studies'
        managed = False
        verbose_name_plural = 'Case Studies'

    def __str__(self):
        return self.title

class Contact(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50, null=True, blank=True)
    company = models.CharField(max_length=255, null=True, blank=True)
    service = models.CharField(max_length=255, null=True, blank=True)
    budget = models.CharField(max_length=100, null=True, blank=True)
    message = models.TextField()
    status = models.CharField(
        max_length=50,
        choices=[
            ('NEW', 'New Contact'),
            ('READ', 'Read'),
            ('RESPONDED', 'Responded'),
            ('ARCHIVED', 'Archived')
        ],
        default='NEW'
    )
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'contacts'
        managed = False

    def __str__(self):
        return f"{self.firstName} {self.lastName} ({self.service})"

class Media(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    filename = models.CharField(max_length=255)
    url = models.CharField(max_length=500)
    alt = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=50)
    size = models.IntegerField()
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'media'
        managed = False
        verbose_name_plural = 'Media Items'

    def __str__(self):
        return self.filename

class Newsletter(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    email = models.EmailField(unique=True)
    subscribed = models.BooleanField(default=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'newsletters'
        managed = False

    def __str__(self):
        return self.email

class Testimonial(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    content = models.TextField()
    avatar = models.CharField(max_length=500, null=True, blank=True)
    videoUrl = models.CharField(max_length=500, null=True, blank=True)
    rating = models.IntegerField(default=5)
    showOnHomepage = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'testimonials'
        managed = False

    def __str__(self):
        return f"{self.name} - {self.company}"

class Service(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    icon = models.CharField(max_length=100)
    description = models.TextField()
    features = ArrayField(models.CharField(max_length=255), default=list, blank=True)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    # SEO
    seoTitle = models.CharField(max_length=255, null=True, blank=True)
    seoDescription = models.TextField(null=True, blank=True)
    seoKeywords = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'services'
        managed = False

    def __str__(self):
        return self.title

class ServiceFaq(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    service = models.ForeignKey(Service, db_column='serviceId', on_delete=models.CASCADE, related_name='faqs')
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'service_faqs'
        managed = False
        verbose_name = 'Service FAQ'
        verbose_name_plural = 'Service FAQs'

    def __str__(self):
        return self.question

class Industry(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=100)
    published = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    # SEO
    seoTitle = models.CharField(max_length=255, null=True, blank=True)
    seoDescription = models.TextField(null=True, blank=True)
    seoKeywords = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'industries'
        managed = False
        verbose_name_plural = 'Industries'

    def __str__(self):
        return self.name

class IndustryChallengeSolution(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    industry = models.ForeignKey(Industry, db_column='industryId', on_delete=models.CASCADE, related_name='challenges')
    challenge = models.TextField()
    solution = models.TextField()
    order = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'industry_challenges_solutions'
        managed = False
        verbose_name = 'Industry Challenge & Solution'
        verbose_name_plural = 'Industry Challenges & Solutions'

    def __str__(self):
        return f"Challenge/Solution for {self.industry.name}"

class HomepageContent(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    heroHeading = models.CharField(max_length=255)
    heroSubheading = models.CharField(max_length=500)
    heroCtaText1 = models.CharField(max_length=100)
    heroCtaLink1 = models.CharField(max_length=255)
    heroCtaText2 = models.CharField(max_length=100)
    heroCtaLink2 = models.CharField(max_length=255)
    heroMediaUrl = models.CharField(max_length=500, null=True, blank=True)
    stats = JSONField(default=list, help_text="List of stats: [{'label': 'Name', 'value': '10', 'suffix': '+'}]")
    whyChooseUs = JSONField(default=list, help_text="List of why choose us cards: [{'title': 'Name', 'description': 'desc', 'icon': 'name'}]")
    ctaHeading = models.CharField(max_length=255)
    ctaSubheading = models.CharField(max_length=500)
    ctaButtonText = models.CharField(max_length=100)
    ctaButtonLink = models.CharField(max_length=255)
    sectionOrder = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'homepage_content'
        managed = False
        verbose_name = 'Homepage Content Settings'
        verbose_name_plural = 'Homepage Content Settings'

    def __str__(self):
        return "Homepage Configuration"

class PageSeo(models.Model):
    id = models.CharField(max_length=30, primary_key=True, default=generate_cuid)
    pagePath = models.CharField(max_length=255, unique=True, help_text="Route path e.g. /about, /contact")
    seoTitle = models.CharField(max_length=255)
    metaDescription = models.TextField()
    keywords = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    ogImage = models.CharField(max_length=500, null=True, blank=True)
    canonicalUrl = models.CharField(max_length=500, null=True, blank=True)
    schemaSettings = JSONField(null=True, blank=True, help_text="JSON structured schema metadata")
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'page_seo'
        managed = False
        verbose_name = 'Page SEO Metadata'
        verbose_name_plural = 'Page SEO Metadata'

    def __str__(self):
        return f"SEO for {self.pagePath}"
