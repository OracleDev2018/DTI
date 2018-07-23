<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FacturaType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('numeroFactura', 'Symfony\Component\Form\Extension\Core\Type\TextType', [
            'required' => true,
        ])
        ->add('fechaVencimiento', 'Symfony\Component\Form\Extension\Core\Type\DateType', [
            'widget' => 'single_text',
            'required' => true,
        ])
        ->add('subtotal', 'Symfony\Component\Form\Extension\Core\Type\MoneyType', [
            'currency' => 'USD',
            'attr' => ['pattern' => '\\d{1,9}(\\.\\d{1,2})?'],
        ])
        ->add('iva', 'Symfony\Component\Form\Extension\Core\Type\MoneyType', [
            'currency' => 'USD',
            'attr' => ['pattern' => '\\d{1,9}(\\.\\d{1,2})?'],
            'required' => true,
        ])
        ->add('total', 'Symfony\Component\Form\Extension\Core\Type\MoneyType', [
            'currency' => 'USD',
            'attr' => ['pattern' => '\\d{1,9}(\\.\\d{1,2})?'],
            'required' => true,
        ])
        ->add('estadoFactura', 'Symfony\Component\Form\Extension\Core\Type\TextType', [
            'required' => false,
        ])
        // ->add('createdAt')
        // ->add('updatedAt')
        // ->add('cliente',null, ['choice_label'=>'nombre'])
        ->add('detalles', 'Symfony\Component\Form\Extension\Core\Type\CollectionType', [
            'entry_type' => 'AppBundle\Form\DetalleFacturaType',
            'allow_add' => true,
            'allow_delete' => true,
            'delete_empty' => true,
            'by_reference' => false,
        ])
        ;


    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Factura'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_factura';
    }


}
