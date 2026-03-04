# UpLift High-Level NoSQL Data Model

This document defines the high-level NoSQL database structure for the UpLift platform.  
It outlines the main collections, their attributes, conceptual relationships, and a summary of how the model supports the system requirements.

---

# `users` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique user identifier (document ID). |
| `email` | string | User’s login email (unique). |
| `passwordHash` | string | Hashed password or external authentication reference. |
| `fullName` | string | User’s full name. |
| `dateOfBirth` | string (ISO) | Date of birth (optional for some user types). |
| `userType` | string | `individual`, `frequent_flyer`, `family`, `corporate_traveler`, `corporate_admin`. |
| `organizationId` | string/null | Reference to `organizations._id` for corporate users. |
| `phoneNumber` | string | Contact phone number (optional). |
| `preferences.currency` | string | Preferred currency (e.g., CAD). |
| `preferences.language` | string | Preferred language (e.g., en). |
| `preferences.seatPreference` | string | Seat preference: aisle, window, or none. |
| `preferences.notificationChannels` | array | Notification channels (e.g., `["email"]`). |
| `loyaltyAccounts` | array | Linked loyalty accounts. |
| `loyaltyAccounts[].loyaltyAccountId` | string | Reference to `loyalty_accounts._id`. |
| `loyaltyAccounts[].programCode` | string | Code of loyalty program. |
| `loyaltyAccounts[].lastSyncedAt` | string (ISO) | Timestamp of last sync. |
| `createdAt` | string (ISO) | User creation timestamp. |
| `updatedAt` | string (ISO) | Last update timestamp. |

---

# `organizations` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique organization identifier. |
| `name` | string | Organization name. |
| `billingEmail` | string | Billing contact email. |
| `billingAddress.country` | string | Country code (e.g., CA). |
| `billingAddress.city` | string | City name. |
| `billingAddress.line1` | string | Street address line. |
| `defaultCurrency` | string | Organization’s default currency. |
| `contactPersons` | array | Key contacts in the organization. |
| `contactPersons[].name` | string | Contact name. |
| `contactPersons[].email` | string | Contact email. |
| `contactPersons[].role` | string | Role (e.g., Travel Manager). |
| `travelPolicyId` | string/null | Reference to `corporate_policies._id`. |
| `createdAt` | string (ISO) | Creation timestamp. |
| `updatedAt` | string (ISO) | Last update timestamp. |

---

# `corporate_policies` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique policy identifier. |
| `organizationId` | string | Reference to `organizations._id`. |
| `rules.maxBudgetPerTrip` | number | Maximum allowed budget per trip. |
| `rules.allowedCabinClasses` | array | Allowed cabin classes. |
| `rules.restrictedAirlines` | array | Restricted airline codes. |
| `rules.advancePurchaseDays` | number | Minimum days in advance bookings must be made. |
| `approvalWorkflow.required` | boolean | Whether approval is required. |
| `approvalWorkflow.approverRole` | string | Role responsible for approvals. |
| `createdAt` | string (ISO) | Creation timestamp. |
| `updatedAt` | string (ISO) | Last update timestamp. |

---

# `airlines` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique airline identifier. |
| `code` | string | Airline code (e.g., AC). |
| `name` | string | Airline name. |
| `country` | string | Airline country code. |
| `logoUrl` | string | Airline logo URL (optional). |
| `loyaltyProgram.programCode` | string | Loyalty program code. |
| `loyaltyProgram.programName` | string | Loyalty program name. |

---

# `flights` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique flight identifier. |
| `airlineId` | string | Reference to `airlines._id`. |
| `flightNumber` | string | Flight number. |
| `origin.airportCode` | string | Origin airport code. |
| `origin.city` | string | Origin city. |
| `origin.country` | string | Origin country code. |
| `destination.airportCode` | string | Destination airport code. |
| `destination.city` | string | Destination city. |
| `destination.country` | string | Destination country code. |
| `departureTime` | string (ISO) | Departure time. |
| `arrivalTime` | string (ISO) | Arrival time. |
| `durationMinutes` | number | Flight duration in minutes. |
| `fareOptions` | array | Available fare options. |
| `fareOptions[].fareCode` | string | Fare code. |
| `fareOptions[].cabinClass` | string | Cabin class. |
| `fareOptions[].price.amount` | number | Fare price amount. |
| `fareOptions[].price.currency` | string | Fare currency. |
| `fareOptions[].refundable` | boolean | Whether fare is refundable. |
| `fareOptions[].changeable` | boolean | Whether fare can be changed. |
| `fareOptions[].bagAllowance.carryOn` | number | Carry-on bags allowed. |
| `fareOptions[].bagAllowance.checked` | number | Checked bags allowed. |
| `createdAt` | string (ISO) | Creation timestamp. |
| `updatedAt` | string (ISO) | Last update timestamp. |

---

# `bookings` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique booking identifier. |
| `bookingRef` | string | Booking reference code. |
| `userId` | string | Reference to `users._id`. |
| `organizationId` | string/null | Reference to `organizations._id`. |
| `status` | string | `pending`, `confirmed`, `cancelled`. |
| `itinerary.tripType` | string | `one_way`, `round_trip`, `multi_city`. |
| `itinerary.segments` | array | List of flight segments. |
| `itinerary.segments[].flightId` | string | Reference to `flights._id`. |
| `itinerary.segments[].fareCode` | string | Selected fare code. |
| `passengers` | array | Passengers on the booking. |
| `passengers[].passengerId` | string | Passenger identifier. |
| `passengers[].fullName` | string | Passenger name. |
| `passengers[].dateOfBirth` | string (ISO) | Passenger date of birth. |
| `passengers[].type` | string | `adult`, `child`, `infant`. |
| `passengers[].loyaltyAccountId` | string/null | Loyalty account reference. |
| `pricing.currency` | string | Currency used. |
| `pricing.baseFare` | number | Base fare. |
| `pricing.taxesAndFees` | number | Taxes and fees. |
| `pricing.total` | number | Total booking price. |
| `policyCheck.policyId` | string/null | Reference to `corporate_policies._id`. |
| `policyCheck.inPolicy` | boolean | Indicates if booking follows policy. |
| `policyCheck.violations` | array | Policy violation list. |
| `paymentId` | string/null | Reference to `payments._id`. |
| `createdAt` | string (ISO) | Booking creation timestamp. |
| `updatedAt` | string (ISO) | Last update timestamp. |
| `cancelledAt` | string/null | Cancellation timestamp. |

---

# `payments` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique payment identifier. |
| `bookingId` | string | Reference to `bookings._id`. |
| `userId` | string | Reference to `users._id`. |
| `amount` | number | Payment amount. |
| `currency` | string | Payment currency. |
| `status` | string | `pending`, `success`, `failed`, `refunded`. |
| `paymentMethod.type` | string | Payment method (e.g., card). |
| `paymentMethod.last4` | string | Last 4 digits of card. |
| `paymentMethod.brand` | string | Card brand. |
| `transactionRef` | string | External payment reference. |
| `processedAt` | string (ISO) | Timestamp when payment was processed. |

---

# `loyalty_accounts` Collection

| Field | Type | Description |
|------|------|-------------|
| `_id` | string | Unique loyalty account identifier. |
| `userId` | string | Reference to `users._id`. |
| `airlineId` | string | Reference to `airlines._id`. |
| `programCode` | string | Loyalty program code. |
| `membershipNumber` | string | Loyalty membership number. |
| `statusLevel` | string | Loyalty status level. |
| `pointsBalance` | number | Current points balance. |
| `pointsUpdatedAt` | string (ISO) | Last points update timestamp. |
| `createdAt` | string (ISO) | Creation timestamp. |
| `updatedAt` | string (ISO) | Last update timestamp. |

---

# Relationship Overview (Conceptual)

- Users → Bookings (1-to-many)  
- Organizations → Users (1-to-many)  
- Organizations → Corporate Policies (1-to-1)  
- Flights → Airlines (many-to-1)  
- Bookings → Flights (many-to-many via itinerary segments)  
- Users → Loyalty Accounts (1-to-many)

---

# Data Model Summary

The UpLift platform uses a document-oriented NoSQL data model built around a small set of clear, high-level collections: `users`, `organizations`, `corporate_policies`, `airlines`, `flights`, `bookings`, `payments`, and `loyalty_accounts`. Users and organizations capture all individual, family, frequent flyer, and corporate roles, while corporate policies store configurable travel rules that can be applied during booking. Flights and airlines represent the searchable flight inventory, and bookings link users, passengers, and selected flights into a single itinerary with pricing, policy checks, and payment references. Loyalty accounts provide a unified view of points across airlines. Relationships are handled through lightweight ID references rather than strict joins, which keeps the model flexible, scalable, and easy to evolve as new features are added while still supporting core system functionality such as flight search, booking, trip management, loyalty tracking, and corporate travel policy control.
