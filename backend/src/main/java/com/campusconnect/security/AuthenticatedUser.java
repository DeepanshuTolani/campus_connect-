package com.campusconnect.security;

public record AuthenticatedUser(Long id, String username, String role) {
}
