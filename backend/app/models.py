from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, JSON, ForeignKey
from .database import Base

class Shipment(Base):
    __tablename__ = "shipments"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    shipment_id: Mapped[str] = mapped_column(String(50), index=True, unique=True)
    supplier_name: Mapped[str | None] = mapped_column(String(200), default=None)
    status: Mapped[str] = mapped_column(String(50), default="pending")
    extracted_data: Mapped[dict | None] = mapped_column(JSON, default=None)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Document(Base):
    __tablename__ = "documents"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    shipment_id: Mapped[int] = mapped_column(ForeignKey("shipments.id"))
    doc_type: Mapped[str] = mapped_column(String(50))  # invoice, packing_list, bill_of_lading
    file_path: Mapped[str] = mapped_column(String(500))
    extracted_data: Mapped[dict | None] = mapped_column(JSON, default=None)