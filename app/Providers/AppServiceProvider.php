<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
public function boot(): void
{
    // Force URL scheme to HTTPS in production or deployment environment
    if ($this->app->environment('production') || $this->app->environment('staging')) {
        URL::forceScheme('https');
    }
}
}