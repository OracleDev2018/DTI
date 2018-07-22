<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ArticuloType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('codProducto')
        ->add('nombreProducto')
        ->add('precio')
        ->add('cantidadDisponible')
        ->add('fechaVencimiento')
        // ->add('createdAt')
        // ->add('updatedAt')
        ->add('idFProveedor',null, ['choice_label'=>'codProveedor'])
        ->add('idFMarca',null, ['choice_label'=>'nombreMarca'])
        ;
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Articulo'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_articulo';
    }


}
