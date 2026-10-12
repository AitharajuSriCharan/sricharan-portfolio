package com.sricharan.portfolio.controller;

import com.sricharan.portfolio.dto.ApiResponse;
import com.sricharan.portfolio.dto.ContactRequest;
import com.sricharan.portfolio.dto.ContactResponse;
import com.sricharan.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /**
     * Submit contact message: POST /api/contact
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ContactResponse>> submitContactMessage(
            @Valid @RequestBody ContactRequest request) {

        ContactResponse responseData = contactService.saveMessage(request);
        ApiResponse<ContactResponse> apiResponse = ApiResponse.success(
                "Thank you for reaching out! Your message has been received successfully.",
                responseData
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    /**
     * Admin-only retrieval of contact messages: GET /api/contact
     * Protected by X-Admin-Key header
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ContactResponse>>> getContactMessages(
            @RequestHeader(value = "X-Admin-Key", required = false) String adminKey,
            @PageableDefault(size = 10) Pageable pageable) {

        Page<ContactResponse> page = contactService.getAllMessages(pageable, adminKey);
        ApiResponse<Page<ContactResponse>> apiResponse = ApiResponse.success(
                "Contact messages retrieved successfully.",
                page
        );

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Admin-only deletion of contact message: DELETE /api/contact/{id}
     * Protected by X-Admin-Key header
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContactMessage(
            @PathVariable Long id,
            @RequestHeader(value = "X-Admin-Key", required = false) String adminKey) {

        contactService.deleteMessage(id, adminKey);
        ApiResponse<Void> apiResponse = ApiResponse.success(
                "Message deleted successfully.",
                null
        );

        return ResponseEntity.ok(apiResponse);
    }
}
