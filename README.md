# Commerce Microservices Platform

> A portfolio project exploring service boundaries, protocol choices, and service discovery with NestJS and Nx.

This repository contains a small commerce platform built as independently deployable services. The goal is to demonstrate how a checkout flow can coordinate authentication, inventory, orders, and payments across different communication styles rather than placing every responsibility in one application.

## Architecture

| Service | Responsibility | Communication |
| --- | --- | --- |
| `auth-service` | Authentication boundary | NestJS TCP microservice on port `5005` |
| `inventory-service` | Stock checks | NestJS gRPC service on port `5006` |
| `order-service` | Order API | HTTP API on port `3000` |
| `payment-service` | Payment API and registration | HTTP API on port `3005`, registered with Consul |
| `checkout-service` | Checkout orchestration | HTTP API on port `3000` |

The shared [inventory.proto](libs/proto/inventory.proto) contract defines the inventory `checkStock` RPC. Each service has a matching e2e project, making the workspace ready to grow from a prototype into a more complete system.

## Why This Project

This project is a practical showcase of:

- NestJS HTTP and microservice applications in one workspace
- TCP and gRPC communication for different service needs
- Consul-based service registration for the payment service
- Nx project orchestration, dependency-aware builds, and task caching
- TypeScript project structure with shared libraries and e2e test projects

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Consul running locally on `localhost:8500` when working with payments

Install dependencies from the repository root:

```bash
npm install
```

### Run a service

Use the local Nx CLI through npm:

```bash
npm exec nx serve auth-service
npm exec nx serve inventory-service
npm exec nx serve order-service
npm exec nx serve payment-service
npm exec nx serve checkout-service
```

Run each long-lived service in its own terminal. The current prototype uses port `3000` for both the order and checkout HTTP applications, so change the `PORT` environment variable or run them separately while developing.

### Build and test

```bash
npm exec nx run-many -t build
npm exec nx run-many -t test
npm exec nx graph
```

The graph command opens the Nx dependency graph and is useful for understanding how the services and libraries are organized.

## Repository Layout

```text
auth-service/             TCP authentication service
checkout-service/         Checkout HTTP service
inventory-service/        gRPC inventory service
order-service/            Order HTTP service
payment-service/          Payment HTTP service with Consul registration
*-e2e/                    End-to-end test projects for each service
libs/proto/               Shared protobuf contracts
shared/                   Shared TypeScript library
```

## Project Status

This is an actively evolving portfolio project. The current implementation focuses on the service boundaries and communication infrastructure; persistence, authentication flows, payment provider integration, and production deployment concerns are planned areas for continued development.

## Technology Stack

`TypeScript` · `NestJS` · `Nx` · `gRPC` · `TCP microservices` · `Consul` · `Jest` · `Webpack`

## License

No license has been specified yet.
