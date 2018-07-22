<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DetalleFactura
 *
 * @ORM\Table(name="detalle_factura")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DetalleFacturaRepository")
 */
class DetalleFactura
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="Cantidad", type="integer")
     */
    private $cantidad;

    /**
     * @var string
     *
     * @ORM\Column(name="PrecioUnitario", type="decimal", precision=10, scale=0)
     */
    private $precioUnitario;

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
     * La factura a la que pertenecen.
     *
     * @var \Factura
     *
     * @ORM\ManyToOne(targetEntity="Factura", inversedBy="detalles", cascade={"persist"})
     * @ORM\JoinColumn(name="id_f_factura", referencedColumnName="id")
     */
    private $factura;

    /**
    * @var \Articulo
    *
    * @ORM\OneToOne(targetEntity="Articulo")
    * @ORM\JoinColumn(name="id_f_articulo", referencedColumnName="id")
    */
   private $idFarticulo;


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
     * Set cantidad
     *
     * @param integer $cantidad
     *
     * @return DetalleFactura
     */
    public function setCantidad($cantidad)
    {
        $this->cantidad = $cantidad;

        return $this;
    }

    /**
     * Get cantidad
     *
     * @return int
     */
    public function getCantidad()
    {
        return $this->cantidad;
    }

    /**
     * Set precioUnitario
     *
     * @param string $precioUnitario
     *
     * @return DetalleFactura
     */
    public function setPrecioUnitario($precioUnitario)
    {
        $this->precioUnitario = $precioUnitario;

        return $this;
    }

    /**
     * Get precioUnitario
     *
     * @return string
     */
    public function getPrecioUnitario()
    {
        return $this->precioUnitario;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return DetalleFactura
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
     * @return DetalleFactura
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
}
