# Chore 9: Design Database Schema

**Estimated Time:** 1-2 hours

## Task
Design database models and relationships before coding

## Steps

- [ ] Identify all data entities needed (User, main resource, related entities)
- [ ] Choose modeling tool:
  - **MongoDB Modeler:** https://mongomodeler.com/editor.html (visual design for MongoDB schemas)
  - Paper/whiteboard sketch
  - Draw.io or Lucidchart
  - Excalidraw
- [ ] Design User model with fields:
  - username (String, required, unique)
  - email (String, required, unique)
  - password (String, required, hashed)
  - createdAt (Date)
- [ ] Design main resource model with fields and validation rules
- [ ] Define relationships between models:
  - User has many [resources]
  - Use foreign keys (SQL) or references (MongoDB)
- [ ] Identify required fields vs optional fields
- [ ] Define data types for all fields
- [ ] Save schema design (screenshot, export, or document)
- [ ] Verify minimum 2 models with relationships (rubric requirement)

## Acceptance Criteria

- [ ] Minimum 2 models designed (User + main resource)
- [ ] All fields have data types specified
- [ ] Relationships between models defined
- [ ] Required vs optional fields identified
- [ ] Validation rules documented
- [ ] Schema design saved and accessible
