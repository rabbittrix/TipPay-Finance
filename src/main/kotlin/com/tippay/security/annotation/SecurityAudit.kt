package com.tippay.security.annotation

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class SecurityAudit(
    val eventType: SecurityEventType,
    val action: String
) 