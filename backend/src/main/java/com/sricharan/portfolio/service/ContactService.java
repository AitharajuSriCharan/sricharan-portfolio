package com.sricharan.portfolio.service;

import com.sricharan.portfolio.dto.ContactRequest;
import com.sricharan.portfolio.dto.ContactResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactService {

    ContactResponse saveMessage(ContactRequest request);

    Page<ContactResponse> getAllMessages(Pageable pageable, String providedAdminKey);

    void deleteMessage(Long id, String providedAdminKey);
}
