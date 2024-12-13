use axum::{
    middleware,
    routing::{get, post},
    Router,
};
use sqlx::PgPool;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Load configuration
    let settings = Settings::new().expect("Failed to load settings");

    // Set up database connection
    let db_pool = PgPool::connect(&settings.database_url)
        .await
        .expect("Failed to connect to database");

    // Create router with routes
    let app = Router::new()
        .route("/api/transactions", post(create_transaction))
        .route("/api/transactions/:id", get(get_transaction))
        .layer(middleware::from_fn_with_state(
            AppState {
                db_pool: db_pool.clone(),
                jwt_secret: settings.jwt_secret.clone(),
            },
            auth,
        ))
        .layer(CorsLayer::permissive());

    // Start server
    let addr = SocketAddr::from(([0, 0, 0, 0], settings.server.port));
    tracing::info!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
} 