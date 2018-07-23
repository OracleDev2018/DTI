<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Factura
 *
 * @ORM\Table(name="factura")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FacturaRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Factura
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="NumeroFactura", type="string", length=255)
     */
    private $numeroFactura;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fechaVencimiento", type="date")
     */
    private $fechaVencimiento;

    /**
     * @var string
     *
     * @ORM\Column(name="subtotal", type="decimal", precision=10, scale=0)
     */
    private $subtotal;

    /**
     * @var int
     *
     * @ORM\Column(name="Iva", type="integer")
     */
    private $iva;

    /**
     * @var string
     *
     * @ORM\Column(name="Total", type="decimal", precision=10, scale=0)
     */
    private $total;

    /**
     * @var string
     *
     * @ORM\Column(name="EstadoFactura", type="string", length=255)
     */
    private $estadoFactura;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     */
    private $updatedAt;

    /**
     * Una Factura tiene muchos DetallFactura.
     *
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\OneToMany(
     *   targetEntity="DetalleFactura",
     *   mappedBy="factura",
     *   fetch="EXTRA_LAZY",
     *   orphanRemoval=true,
     *   cascade={"persist", "remove"}
     * )
     */
    private $detalles;

      /**
     * Quien la creó?
     *
     * @var \AppBundle\Entity\Cliente
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Cliente")
     * @ORM\JoinColumn(name="id_f_cliente", referencedColumnName="id")
     */
    private $cliente;
    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set numeroFactura
     *
     * @param string $numeroFactura
     *
     * @return Factura
     */
    public function setNumeroFactura($numeroFactura)
    {
        $this->numeroFactura = $numeroFactura;

        return $this;
    }

    /**
     * Get numeroFactura
     *
     * @return string
     */
    public function getNumeroFactura()
    {
        return $this->numeroFactura;
    }

    /**
     * Set fechaVencimiento
     *
     * @param \DateTime $fechaVencimiento
     *
     * @return Factura
     */
    public function setFechaVencimiento($fechaVencimiento)
    {
        $this->fechaVencimiento = $fechaVencimiento;

        return $this;
    }

    /**
     * Get fechaVencimiento
     *
     * @return \DateTime
     */
    public function getFechaVencimiento()
    {
        return $this->fechaVencimiento;
    }

    /**
     * Set subtotal
     *
     * @param string $subtotal
     *
     * @return Factura
     */
    public function setSubtotal($subtotal)
    {
        $this->subtotal = $subtotal;

        return $this;
    }

    /**
     * Get subtotal
     *
     * @return string
     */
    public function getSubtotal()
    {
        return $this->subtotal;
    }

    /**
     * Set iva
     *
     * @param integer $iva
     *
     * @return Factura
     */
    public function setIva($iva)
    {
        $this->iva = $iva;

        return $this;
    }

    /**
     * Get iva
     *
     * @return int
     */
    public function getIva()
    {
        return $this->iva;
    }

    /**
     * Set total
     *
     * @param string $total
     *
     * @return Factura
     */
    public function setTotal($total)
    {
        $this->total = $total;

        return $this;
    }

    /**
     * Get total
     *
     * @return string
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * Set estadoFactura
     *
     * @param string $estadoFactura
     *
     * @return Factura
     */
    public function setEstadoFactura($estadoFactura)
    {
        $this->estadoFactura = $estadoFactura;

        return $this;
    }

    /**
     * Get estadoFactura
     *
     * @return string
     */
    public function getEstadoFactura()
    {
        return $this->estadoFactura;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Factura
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Factura
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->detalles = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    /**
     * Add detalle
     *
     * @param \AppBundle\Entity\DetalleFactura $detalle
     *
     * @return Factura
     */
    public function addDetalle(\AppBundle\Entity\DetalleFactura $detalle)
    {
      if ($this->detalles->contains($detalle)) {
          return;
      }

      $this->detalles[] = $detalle;
      $detalle->setFactura($this);

      return $this;
    }

    /**
     * Remove detalle
     *
     * @param \AppBundle\Entity\DetalleFactura $detalle
     */
    public function removeDetalle(\AppBundle\Entity\DetalleFactura $detalle)
    {
      if (!$this->detalles->contains($detalle)) {
          return;
      }

      $this->detalles->removeElement($detalle);
    }

    /**
     * Get detalles
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDetalles()
    {
        return $this->detalles;
    }

    /**
     * Set cliente
     *
     * @param \AppBundle\Entity\Cliente $cliente
     *
     * @return Factura
     */
    public function setCliente(\AppBundle\Entity\Cliente $cliente = null)
    {
        $this->cliente = $cliente;

        return $this;
    }

    /**
     * Get cliente
     *
     * @return \AppBundle\Entity\Cliente
     */
    public function getCliente()
    {
        return $this->cliente;
    }
}
