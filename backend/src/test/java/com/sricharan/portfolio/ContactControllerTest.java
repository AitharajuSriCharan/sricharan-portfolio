package com.sricharan.portfolio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sricharan.portfolio.dto.ContactRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Health endpoint returns status UP")
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").exists());
    }

    @Test
    @DisplayName("POST /api/contact with valid data returns 201 Created")
    void testValidContactSubmission() throws Exception {
        ContactRequest validRequest = new ContactRequest(
                "Aitharaju Sri Charan",
                "sricharan@example.com",
                "Hardware Internship Opportunity",
                "I would like to discuss an opportunity regarding VLSI design."
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.name").value("Aitharaju Sri Charan"))
                .andExpect(jsonPath("$.data.email").value("sricharan@example.com"));
    }

    @Test
    @DisplayName("POST /api/contact with invalid data returns 400 Bad Request with field errors")
    void testInvalidContactSubmission() throws Exception {
        ContactRequest invalidRequest = new ContactRequest(
                "", // empty name
                "invalid-email-format", // invalid email
                "", // empty subject
                "short" // less than 10 chars
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.subject").exists())
                .andExpect(jsonPath("$.errors.message").exists());
    }

    @Test
    @DisplayName("GET /api/contact without key returns 401 Unauthorized")
    void testGetMessagesUnauthorized() throws Exception {
        mockMvc.perform(get("/api/contact"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/contact with valid key returns 200 OK and messages")
    void testGetMessagesAuthorized() throws Exception {
        mockMvc.perform(get("/api/contact")
                        .header("X-Admin-Key", "portfolio-admin-secret-key-2026"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    @DisplayName("DELETE /api/contact/{id} without key returns 401 Unauthorized")
    void testDeleteMessageUnauthorized() throws Exception {
        mockMvc.perform(delete("/api/contact/1"))
                .andExpect(status().isUnauthorized());
    }
}
