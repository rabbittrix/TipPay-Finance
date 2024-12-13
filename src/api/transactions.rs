use axum::{
    extract::{Path, State},
    Json,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct CreateTransaction {
    pub amount: i64,
    pub description: String,
}

#[derive(Debug, Serialize)]
pub struct TransactionResponse {
    pub id: Uuid,
    pub status: TransactionStatus,
    pub amount: i64,
}

pub async fn create_transaction(
    State(state): State<AppState>,
    claims: Claims,
    Json(payload): Json<CreateTransaction>,
) -> Result<Json<TransactionResponse>, StatusCode> {
    let transaction = sqlx::query_as!(
        Transaction,
        r#"
        INSERT INTO transactions (user_id, amount, status)
        VALUES ($1, $2, 'pending')
        RETURNING *
        "#,
        Uuid::parse_str(&claims.sub)?,
        payload.amount,
    )
    .fetch_one(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(TransactionResponse {
        id: transaction.id,
        status: transaction.status,
        amount: transaction.amount,
    }))
}

pub async fn get_transaction(
    State(state): State<AppState>,
    claims: Claims,
    Path(id): Path<Uuid>,
) -> Result<Json<TransactionResponse>, StatusCode> {
    let transaction = sqlx::query_as!(
        Transaction,
        r#"
        SELECT * FROM transactions
        WHERE id = $1 AND user_id = $2
        "#,
        id,
        Uuid::parse_str(&claims.sub)?,
    )
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(TransactionResponse {
        id: transaction.id,
        status: transaction.status,
        amount: transaction.amount,
    }))
} 