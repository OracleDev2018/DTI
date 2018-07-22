<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Marca
 *
 * @ORM\Table(name="marca")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\MarcaRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Marca
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
     * @ORM\Column(name="nombreMarca", type="string", length=255)
     */
    private $nombreMarca;

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
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set nombreMarca
     *
     * @param string $nombreMarca
     *
     * @return Marca
     */
    public function setNombreMarca($nombreMarca)
    {
        $this->nombreMarca = $nombreMarca;

        return $this;
    }

    /**
     * Get nombreMarca
     *
     * @return string
     */
    public function getNombreMarca()
    {
        return $this->nombreMarca;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Marca
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
     * @return Marca
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
}
