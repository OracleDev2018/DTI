<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DetalleFacturaType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('cantidad', 'Symfony\Component\Form\Extension\Core\Type\IntegerType', [
            'attr' => ['pattern' => '\\d+'],
        ])
        ->add('precioUnitario', 'Symfony\Component\Form\Extension\Core\Type\MoneyType', [
            'currency' => 'USD',
            'attr' => ['pattern' => '\\d{1,9}(\\.\\d{1,2})?'],
        ])
        ->add('idFarticulo', 'Symfony\Bridge\Doctrine\Form\Type\EntityType', [
            'class' => 'AppBundle:Articulo',
            'choice_label' => 'nombre',
        ])
        ;
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\DetalleFactura'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_detallefactura';
    }


}
