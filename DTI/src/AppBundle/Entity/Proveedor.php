<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Proveedor
 *
 * @ORM\Table(name="proveedor")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ProveedorRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Proveedor
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
     * @var string
     *
     * @ORM\Column(name="CodProveedor", type="string", length=20)
     */
    private $codProveedor;

    /**
     * @var string
     *
     * @ORM\Column(name="NombreProveedor", type="string", length=255)
     */
    private $nombreProveedor;

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
    * @var \Empresa
    *
    * @ORM\OneToOne(targetEntity="Empresa")
    * @ORM\JoinColumn(name="id_f_Empresa", referencedColumnName="id")
    */
   private $idFEmpresa;


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
     * Set codProveedor
     *
     * @param string $codProveedor
     *
     * @return Proveedor
     */
    public function setCodProveedor($codProveedor)
    {
        $this->codProveedor = $codProveedor;

        return $this;
    }

    /**
     * Get codProveedor
     *
     * @return string
     */
    public function getCodProveedor()
    {
        return $this->codProveedor;
    }

    /**
     * Set nombreProveedor
     *
     * @param string $nombreProveedor
     *
     * @return Proveedor
     */
    public function setNombreProveedor($nombreProveedor)
    {
        $this->nombreProveedor = $nombreProveedor;

        return $this;
    }

    /**
     * Get nombreProveedor
     *
     * @return string
     */
    public function getNombreProveedor()
    {
        return $this->nombreProveedor;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Proveedor
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
     * @return Proveedor
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
   * @ORM\PrePersist
   */
  public function setCreatedAtValue()
  {
      $this->createdAt = new \DateTime();
  }

  /**
   * @ORM\PrePersist
   * @ORM\PreUpdate
   */
  public function setUpdatedAtValue()
  {
      $this->updatedAt = new \DateTime();
  }

    /**
     * Set idFEmpresa
     *
     * @param \AppBundle\Entity\Empresa $idFEmpresa
     *
     * @return Proveedor
     */
    public function setIdFEmpresa(\AppBundle\Entity\Empresa $idFEmpresa = null)
    {
        $this->idFEmpresa = $idFEmpresa;

        return $this;
    }

    /**
     * Get idFEmpresa
     *
     * @return \AppBundle\Entity\Empresa
     */
    public function getIdFEmpresa()
    {
        return $this->idFEmpresa;
    }
  
}
