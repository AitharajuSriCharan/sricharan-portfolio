package com.sricharan.portfolio.service.impl;

import com.sricharan.portfolio.dto.ContactRequest;
import com.sricharan.portfolio.dto.ContactResponse;
import com.sricharan.portfolio.entity.ContactMessage;
import com.sricharan.portfolio.repository.ContactMessageRepository;
import com.sricharan.portfolio.service.ContactService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ContactServiceImpl implements ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactServiceImpl.class);

    private final ContactMessageRepository contactMessageRepository;

    @Value("${app.admin-key}")
    private String configuredAdminKey;

    public ContactServiceImpl(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Override
    @Transactional
    public ContactResponse saveMessage(ContactRequest request) {
        log.info("Processing contact submission from sender: [{}], subject: [{}]",
                maskEmail(request.getEmail()), request.getSubject());

        ContactMessage entity = new ContactMessage(
                request.getName(),
                request.getEmail(),
                request.getSubject(),
                request.getMessage()
        );

        ContactMessage saved = contactMessageRepository.save(entity);
        log.info("Successfully persisted contact message with id: {}", saved.getId());

        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContactResponse> getAllMessages(Pageable pageable, String providedAdminKey) {
        if (providedAdminKey == null || !providedAdminKey.equals(configuredAdminKey)) {
            log.warn("Unauthorized attempt to access contact messages");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or missing admin credentials");
        }

        return contactMessageRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::mapToResponse);
    }

    @Override
    @Transactional
    public void deleteMessage(Long id, String providedAdminKey) {
        if (providedAdminKey == null || !providedAdminKey.equals(configuredAdminKey)) {
            log.warn("Unauthorized attempt to delete contact message with id {}", id);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or missing admin credentials");
        }

        if (!contactMessageRepository.existsById(id)) {
            log.warn("Attempt to delete non-existent contact message id {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Message not found with id: " + id);
        }

        contactMessageRepository.deleteById(id);
        log.info("Successfully deleted contact message id: {}", id);
    }

    private ContactResponse mapToResponse(ContactMessage entity) {
        return new ContactResponse(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getSubject(),
                entity.getMessage(),
                entity.getCreatedAt()
        );
    }

    private String maskEmail(String email) {
        if (email == null || !email.contains("@")) {
            return "unknown";
        }
        int atIndex = email.indexOf('@');
        if (atIndex <= 2) {
            return "***" + email.substring(atIndex);
        }
        return email.substring(0, 2) + "***" + email.substring(atIndex);
    }
}
