<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\CompanyDocumentController;
use App\Http\Controllers\Api\GraduateProfileController;
use App\Http\Controllers\Api\GraduateSkillController;
use App\Http\Controllers\Api\InterviewController;
use App\Http\Controllers\Api\InternshipController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\SkillRequestController;
use App\Http\Controllers\Api\AdminCompanyVerificationController;
use App\Http\Controllers\Api\AdminMonitoringController;
use App\Http\Controllers\Api\AdminReportController;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| GRADUATE REGISTRATION
|--------------------------------------------------------------------------
*/

Route::post(
    '/register',
    [AuthController::class, 'register']
);


/*
|--------------------------------------------------------------------------
| COMPANY REGISTRATION
|--------------------------------------------------------------------------
|
| Creates both:
| - users record
| - companies record
|
| Company verification status starts as pending.
|
*/

Route::post(
    '/register/company',
    [AuthController::class, 'registerCompany']
);


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

Route::post(
    '/login',
    [AuthController::class, 'login']
);


/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );


    /*
    |--------------------------------------------------------------------------
    | GRADUATE PROFILE
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/graduate/profile',
        [GraduateProfileController::class, 'profile']
    );

    Route::post(
        '/graduate/profile',
        [GraduateProfileController::class, 'store']
    );

    Route::patch(
        '/graduate/profile',
        [GraduateProfileController::class, 'updateProfile']
    );


    /*
    |--------------------------------------------------------------------------
    | GRADUATE RESUME
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/graduate/resume',
        [GraduateProfileController::class, 'uploadResume']
    );

    Route::delete(
        '/graduate/resume',
        [GraduateProfileController::class, 'deleteResume']
    );


    /*
    |--------------------------------------------------------------------------
    | MASTER SKILLS
    |--------------------------------------------------------------------------
    |
    | GET:
    | Graduate / Company / Admin can view active skills.
    |
    | POST/PATCH/DELETE:
    | SkillController enforces Admin-only management.
    |
    */

    Route::get(
        '/skills',
        [SkillController::class, 'index']
    );

    Route::post(
        '/skills',
        [SkillController::class, 'store']
    );

    Route::patch(
        '/skills/{skill}',
        [SkillController::class, 'update']
    );

    Route::delete(
        '/skills/{skill}',
        [SkillController::class, 'destroy']
    );


    /*
    |--------------------------------------------------------------------------
    | GRADUATE SKILLS
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/graduate/skills',
        [GraduateSkillController::class, 'index']
    );

    Route::post(
        '/graduate/skills',
        [GraduateSkillController::class, 'store']
    );

    Route::patch(
        '/graduate/skills/{graduateSkill}',
        [GraduateSkillController::class, 'update']
    );

    Route::delete(
        '/graduate/skills/{graduateSkill}',
        [GraduateSkillController::class, 'destroy']
    );


    /*
    |--------------------------------------------------------------------------
    | GRADUATE SKILL REQUESTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/graduate/skill-requests',
        [SkillRequestController::class, 'ownIndex']
    );

    Route::post(
        '/graduate/skill-requests',
        [SkillRequestController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    | COMPANY SKILL REQUESTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/company/skill-requests',
        [SkillRequestController::class, 'ownIndex']
    );

    Route::post(
        '/company/skill-requests',
        [SkillRequestController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    | PESO ADMIN - SKILL REQUESTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/skill-requests',
        [SkillRequestController::class, 'adminIndex']
    );

    Route::patch(
        '/admin/skill-requests/{skillRequest}/approve',
        [SkillRequestController::class, 'approve']
    );

    Route::patch(
        '/admin/skill-requests/{skillRequest}/reject',
        [SkillRequestController::class, 'reject']
    );


    /*
    |--------------------------------------------------------------------------
    | COMPANY PROFILE
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/company/profile',
        [CompanyController::class, 'profile']
    );

    Route::patch(
        '/company/profile',
        [CompanyController::class, 'updateProfile']
    );

    Route::patch(
        '/company/resubmit',
        [CompanyController::class, 'resubmit']
    );


    /*
    |--------------------------------------------------------------------------
    | COMPANY VERIFICATION DOCUMENTS
    |--------------------------------------------------------------------------
    |
    | Required:
    | - Business Registration
    | - Business / Mayor's Permit
    |
    | Optional:
    | - Representative ID / Authorization
    | - Other Supporting Document
    |
    */

    Route::get(
        '/company/documents',
        [CompanyDocumentController::class, 'index']
    );

    Route::post(
        '/company/documents',
        [CompanyDocumentController::class, 'store']
    );

    Route::delete(
        '/company/documents/{document}',
        [CompanyDocumentController::class, 'destroy']
    );


    /*
    |--------------------------------------------------------------------------
    | PESO ADMIN - MONITORING
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/dashboard',
        [AdminMonitoringController::class, 'dashboard']
    );

    Route::get(
        '/admin/companies',
        [AdminMonitoringController::class, 'companies']
    );

    Route::get(
        '/admin/graduates',
        [AdminMonitoringController::class, 'graduates']
    );

    Route::get(
        '/admin/internships',
        [AdminMonitoringController::class, 'internships']
    );

    Route::get(
        '/admin/applications',
        [AdminMonitoringController::class, 'applications']
    );

    Route::get(
        '/admin/interviews',
        [AdminMonitoringController::class, 'interviews']
    );


    /*
    |--------------------------------------------------------------------------
    | PESO ADMIN - REPORTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/reports',
        [AdminReportController::class, 'index']
    );


    /*
    |--------------------------------------------------------------------------
    | PESO ADMIN - COMPANY VERIFICATION
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | /pending must stay before /{company}
    |
    */

    Route::get(
        '/admin/companies/pending',
        [AdminCompanyVerificationController::class, 'pending']
    );

    Route::get(
        '/admin/companies/{company}',
        [AdminCompanyVerificationController::class, 'show']
    );

    Route::patch(
        '/admin/companies/{company}/approve',
        [AdminCompanyVerificationController::class, 'approve']
    );

    Route::patch(
        '/admin/companies/{company}/reject',
        [AdminCompanyVerificationController::class, 'reject']
    );


    /*
    |--------------------------------------------------------------------------
    | INTERNSHIPS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'internships',
        InternshipController::class
    );


    /*
    |--------------------------------------------------------------------------
    | APPLICATIONS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'applications',
        ApplicationController::class
    );


    /*
    |--------------------------------------------------------------------------
    | INTERVIEWS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'interviews',
        InterviewController::class
    );


    /*
    |--------------------------------------------------------------------------
    | MESSAGES
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'messages',
        MessageController::class
    );


    /*
    |--------------------------------------------------------------------------
    | NOTIFICATIONS
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/notifications',
        [NotificationController::class, 'index']
    );

    Route::get(
        '/notifications/unread-count',
        [NotificationController::class, 'unreadCount']
    );

    Route::patch(
        '/notifications/read-all',
        [NotificationController::class, 'markAllAsRead']
    );

    Route::patch(
        '/notifications/{notification}/read',
        [NotificationController::class, 'markAsRead']
    );
});