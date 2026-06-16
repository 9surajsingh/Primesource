import json
from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from unfold.decorators import action, display

from .models import (
    User, BlogPost, Job, JobApplication, CaseStudy,
    Contact, Media, Newsletter, Testimonial,
    Service, ServiceFaq, Industry, IndustryChallengeSolution,
    HomepageContent, PageSeo
)

# ─── Inlines ──────────────────────────────────────────────────────────────────

class ServiceFaqInline(TabularInline):
    model = ServiceFaq
    extra = 1
    fields = ('question', 'answer', 'order')
    tab = True

class IndustryChallengeSolutionInline(StackedInline):
    model = IndustryChallengeSolution
    extra = 1
    fields = ('challenge', 'solution', 'order')
    tab = True

# ─── Model Admins ─────────────────────────────────────────────────────────────

@admin.register(User)
class UserAdmin(ModelAdmin):
    list_display = ('name', 'email', 'role', 'createdAt')
    list_filter = ('role',)
    search_fields = ('name', 'email')
    readonly_fields = ('createdAt', 'updatedAt')

@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display = ('title', 'category', 'published_status', 'featured_status', 'author_name', 'views', 'publishedAt')
    list_filter = ('published', 'featured', 'category')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    autocomplete_fields = ['author']
    readonly_fields = ('createdAt', 'updatedAt', 'views')
    
    fieldsets = (
        ('General Info', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'coverImage', 'author')
        }),
        ('Categorization & Status', {
            'fields': ('category', 'tags', 'published', 'featured', 'publishedAt')
        }),
        ('SEO Metadata', {
            'classes': ('collapse',),
            'fields': ('seoTitle', 'seoDescription', 'seoKeywords')
        }),
        ('Related Posts', {
            'classes': ('collapse',),
            'fields': ('relatedPostIds',)
        })
    )

    @display(description="Published", boolean=True)
    def published_status(self, obj):
        return obj.published

    @display(description="Featured", boolean=True)
    def featured_status(self, obj):
        return obj.featured

    @display(description="Author")
    def author_name(self, obj):
        return obj.author.name

@admin.register(Job)
class JobAdmin(ModelAdmin):
    list_display = ('title', 'department', 'location', 'type', 'published_status', 'featured_status', 'applications_count')
    list_filter = ('published', 'featured', 'type', 'department')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('createdAt', 'updatedAt')

    @display(description="Published", boolean=True)
    def published_status(self, obj):
        return obj.published

    @display(description="Featured", boolean=True)
    def featured_status(self, obj):
        return obj.featured

    @display(description="Applications")
    def applications_count(self, obj):
        count = obj.applications.count()
        url = reverse('admin:core_jobapplication_changelist') + f'?job__id__exact={obj.id}'
        return format_html('<a href="{}" class="font-semibold text-blue-600 hover:underline">{} Applications</a>', url, count)

@admin.register(JobApplication)
class JobApplicationAdmin(ModelAdmin):
    list_display = ('candidate_name', 'email', 'job_title', 'status_badge', 'createdAt', 'resume_download')
    list_filter = ('status', 'job__department', 'job')
    search_fields = ('firstName', 'lastName', 'email', 'coverLetter')
    readonly_fields = ('createdAt', 'updatedAt')
    
    actions = ['mark_reviewing', 'mark_interviewed', 'mark_offered', 'mark_hired', 'mark_rejected']

    @display(description="Candidate Name")
    def candidate_name(self, obj):
        return f"{obj.firstName} {obj.lastName}"

    @display(description="Job Title")
    def job_title(self, obj):
        return obj.job.title

    @display(description="Status")
    def status_badge(self, obj):
        colors = {
            'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'REVIEWING': 'bg-blue-100 text-blue-800 border-blue-200',
            'SHORTLISTED': 'bg-indigo-100 text-indigo-800 border-indigo-200',
            'INTERVIEWED': 'bg-purple-100 text-purple-800 border-purple-200',
            'OFFERED': 'bg-teal-100 text-teal-800 border-teal-200',
            'HIRED': 'bg-green-100 text-green-800 border-green-200',
            'REJECTED': 'bg-red-100 text-red-800 border-red-200',
        }
        color_class = colors.get(obj.status, 'bg-gray-100 text-gray-800 border-gray-200')
        return format_html(
            '<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border {}">{}</span>',
            color_class,
            obj.get_status_display()
        )

    @display(description="Resume")
    def resume_download(self, obj):
        if obj.resume:
            return format_html(
                '<a href="{}" target="_blank" class="inline-flex items-center text-blue-600 hover:underline">'
                '<span class="material-symbols-outlined mr-1 text-sm">download</span> Download'
                '</a>',
                obj.resume
            )
        return "-"

    @action(description="Mark selected applications as Reviewing")
    def mark_reviewing(self, request, queryset):
        queryset.update(status='REVIEWING')

    @action(description="Mark selected applications as Interview Scheduled")
    def mark_interviewed(self, request, queryset):
        queryset.update(status='SHORTLISTED')

    @action(description="Mark selected applications as Offered")
    def mark_offered(self, request, queryset):
        queryset.update(status='OFFERED')

    @action(description="Mark selected applications as Hired")
    def mark_hired(self, request, queryset):
        queryset.update(status='HIRED')

    @action(description="Mark selected applications as Rejected")
    def mark_rejected(self, request, queryset):
        queryset.update(status='REJECTED')

@admin.register(CaseStudy)
class CaseStudyAdmin(ModelAdmin):
    list_display = ('title', 'client', 'industry', 'published_status', 'featured_status')
    list_filter = ('published', 'featured', 'industry')
    search_fields = ('title', 'client', 'challenge', 'solution', 'results')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('createdAt', 'updatedAt')

    @display(description="Published", boolean=True)
    def published_status(self, obj):
        return obj.published

    @display(description="Featured", boolean=True)
    def featured_status(self, obj):
        return obj.featured

@admin.register(Contact)
class ContactAdmin(ModelAdmin):
    list_display = ('firstName', 'lastName', 'email', 'service', 'budget', 'status_badge', 'createdAt')
    list_filter = ('status', 'service')
    search_fields = ('firstName', 'lastName', 'email', 'company', 'message')
    readonly_fields = ('createdAt', 'updatedAt')
    
    @display(description="Status")
    def status_badge(self, obj):
        colors = {
            'NEW': 'bg-red-100 text-red-800 border-red-200',
            'READ': 'bg-blue-100 text-blue-800 border-blue-200',
            'RESPONDED': 'bg-green-100 text-green-800 border-green-200',
            'ARCHIVED': 'bg-gray-100 text-gray-800 border-gray-200',
        }
        color_class = colors.get(obj.status, 'bg-gray-100 text-gray-800 border-gray-200')
        return format_html(
            '<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border {}">{}</span>',
            color_class,
            obj.get_status_display()
        )

@admin.register(Media)
class MediaAdmin(ModelAdmin):
    list_display = ('filename', 'preview_thumbnail', 'type', 'file_size', 'createdAt')
    list_filter = ('type',)
    search_fields = ('filename', 'alt')
    readonly_fields = ('createdAt',)

    @display(description="Preview")
    def preview_thumbnail(self, obj):
        if obj.type.startswith('image'):
            return format_html('<img src="{}" class="w-12 h-12 object-cover rounded border" />', obj.url)
        return format_html('<span class="material-symbols-outlined text-2xl text-slate-400">description</span>')

    @display(description="Size")
    def file_size(self, obj):
        size_kb = obj.size / 1024
        return f"{size_kb:.1f} KB"

@admin.register(Newsletter)
class NewsletterAdmin(ModelAdmin):
    list_display = ('email', 'subscribed', 'createdAt')
    list_filter = ('subscribed',)
    search_fields = ('email',)
    readonly_fields = ('createdAt',)

@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ('name', 'role', 'company', 'rating', 'showOnHomepage', 'order')
    list_filter = ('showOnHomepage', 'rating')
    search_fields = ('name', 'company', 'content')
    list_editable = ('order', 'showOnHomepage')

@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ('title', 'slug', 'icon', 'published', 'order')
    list_editable = ('order', 'published')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ServiceFaqInline]

@admin.register(Industry)
class IndustryAdmin(ModelAdmin):
    list_display = ('name', 'slug', 'published', 'order')
    list_editable = ('order', 'published')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [IndustryChallengeSolutionInline]

@admin.register(HomepageContent)
class HomepageContentAdmin(ModelAdmin):
    list_display = ('__str__', 'heroHeading', 'updatedAt')
    readonly_fields = ('updatedAt',)
    
    # Restrict to a single row to mimic standard WordPress settings
    def has_add_permission(self, request):
        return self.model.objects.count() == 0

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(PageSeo)
class PageSeoAdmin(ModelAdmin):
    list_display = ('pagePath', 'seoTitle', 'updatedAt')
    search_fields = ('pagePath', 'seoTitle', 'metaDescription')
    readonly_fields = ('updatedAt',)
