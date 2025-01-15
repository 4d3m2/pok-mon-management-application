# MERN Stack Technical Test

Welcome to the technical test for the Orange Internship 2025! This test is designed to assess your proficiency in building a full-stack web application using the MERN stack (MongoDB, Express.js, React.js, Node.js). You have 6 hours to complete the tasks outlined below.

**Please read through the entire document before starting.**

---

## Prerequisites

- **Tools**: Node.js and npm installed on your development machine.
- **Skills**: Familiarity with MongoDB, Express.js, React.js, and Node.js.
- **Knowledge**:  
  - RESTful API design and CRUD operations.  
  - Basic authentication and authorization mechanisms (optional).

---

## Overview

In this app, you will create a **Full-Stack Pokémon Management Application**.

---

## Tasks

### 1. Display All Pokémon
**As a user**, I want to see a list of all Pokémon, along with their images, so that I can browse and view the collection.

### 2. View Pokémon Details
**As a user**, I want to click on a Pokémon to view its detailed information, such as name, type, abilities, and stats, so that I can learn more about it.

### 3. Add a New Pokémon
**As a user**, I want to add a new Pokémon by providing details such as name, type, and an image (URL should be sufficient), so that I can expand my collection.  
- Before adding, check if the Pokémon name already exists to avoid duplicates.

### 4. Edit Pokémon Details
**As a user**, I want to edit Pokémon details (e.g., name, type, or image), so that I can correct or update my collection.  
- Before editing, ensure the updated name does not conflict with an existing Pokémon name.

### 5. Delete a Pokémon
**As a user**, I want to delete a Pokémon from the collection based on its name, so that I can manage and declutter my list.

### 6. Filter Pokémon by Type
**As a user**, I want to filter Pokémon by their type (e.g., Fire, Water, Grass), so that I can focus on specific groups of interest.

---

## Bonus Tasks

### 1. Search Pokémon by Name
**As a user**, I want to search for a Pokémon by name, so that I can quickly locate it in my collection.

### 2. Sort Pokémon by Date of Addition
**As a user**, I want to sort Pokémon by their date of addition to the collection, so that I can view the most recently added Pokémon first.

### 3. Authentication
- **As a user**, I want to log in to manage my Pokémon collection.
- **As a user**, I want to perform add/edit/delete operations only when I am authenticated.

### 4. Uploading images
- **As a user**,  I want to upload images from my local machine instead of a URL.
- **As a user**,  I want to retrieve the uploaded images instead of the image URL.

---

## Submission Guidelines

- Clone the provided repository to your local machine.
- Complete the tasks within 6 hours.
- Commit changes frequently with clear commit messages.
- Include a `.gitignore` file in the backend folder to exclude unnecessary files from version control.
- Add a `.env` file in the backend folder with the MongoDB connection URL (`MONGODB_URI`).

---

## Evaluation Criteria

1. **Functionality**: Does the application meet the requirements?
2. **Code Quality**: Is the code well-structured, modular, and easy to understand?
3. **UI/UX**: Is the user interface intuitive and responsive?
4. **Error Handling**: Does the application handle errors gracefully?
5. **Bonus Points**: For implementing authentication and authorization.

---
