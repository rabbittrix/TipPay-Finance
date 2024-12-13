package com.tippay.mtf.controller

import com.tippay.mtf.domain.model.Trade
import com.tippay.mtf.service.TradeService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/trades")
class TradeController(
    private val tradeService: TradeService
) {
    @PostMapping
    @PreAuthorize("hasRole('TRADER')")
    fun createTrade(@RequestBody request: CreateTradeRequest): ResponseEntity<Trade> {
        val trade = tradeService.createTrade(
            buyerId = request.buyerId,
            sellerId = request.sellerId,
            amount = request.amount
        )
        return ResponseEntity.ok(trade)
    }

    @PostMapping("/{tradeId}/match")
    @PreAuthorize("hasRole('ADMIN')")
    fun matchTrade(@PathVariable tradeId: UUID): ResponseEntity<Unit> {
        tradeService.matchTrade(tradeId)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('TRADER', 'ADMIN')")
    fun getUserTrades(
        @PathVariable userId: UUID,
        pageable: Pageable
    ): ResponseEntity<Page<Trade>> {
        val trades = tradeService.getTradesByUser(userId, pageable)
        return ResponseEntity.ok(trades)
    }
} 