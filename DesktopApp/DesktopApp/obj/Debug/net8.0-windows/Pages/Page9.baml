   M S B A M L   `   `   `  ����E  ADesktopApp, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null3clr-namespace:DesktopApp.PagesDesktopApp.Pages  5      &     DesktopApp.Pages.TripDetailsPage   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      0localclr-namespace:DesktopApp.Pages     5        N� Title$  TripDetailsPage��5	      .��5      � 
������� � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6   .+�5   
   �� -   5        $��← Back��5      $
��Left=�5      $	��Top=�5      $��10q�5      
������ $��0q�5      ���#007BFF$
��Bold"�5       � Cursor$
 Hand��5      �� 5   
   $��1��6   $
��Auto=�6$   .��5      �� $��20q�6   .+�5       �  5!      �� 5"      $
��Auto �6(   �� 5#      $
��Auto �6(   �� 5$      $
��Auto �6(    � ColumnDefinitions 5&      �� 5'      $
��Auto �6+   �� 5(      $��* �6+   .+�5+      �� $��Trip Title:��6    $
��Bold"�63   $��16(�6E   $��0��6S   $��0��6`   �� 5,      -   5         ��Name$ TripNameTextBlock��5,       $��16(�6;   $��	10,0,0,10q�6I   $��0��6\   $��1��6i   �� 5.      $��Trip Duration:��6    $
��Bold"�66   $��16(�6H   $��1��6V   $��0��6c   �� 5/      -   5        $ DateRangeTextBlock��5/       $��16(�6<   $��	10,0,0,10q�6J   $��1��6]   $��1��6j   �� 51      $��
Trip Cost:��6    $
��Bold"�62   $��16(�6D   $��2��6R   $��0��6_   �� 52      -   5        $ CostTextBlock��52       $��16(�67   $��	10,0,0,10q�6E   $��2��6X   $��1��6e   53      &   System.Windows.Controls.DataGrid  56      -   5          Name$ ActivitiesDataGrid��56         AutoGenerateColumns$ False��67   $��0,20,0,0q�6S      Columns 57      0  *System.Windows.Controls.DataGridTextColumn  58      ,  &System.Windows.Controls.DataGridColumn   Header$ Title��6-   	   Width5  /System.Windows.Controls.DataGridLengthConverter$	 * 6V   1  +System.Windows.Controls.DataGridBoundColumn
   Binding
 6<   �� *Title+6V     59      $ Category��6-   $	 * 6\   
 6?   �� *
Category+6\     5:      $ Location��6-   $	 * 6\   
 6?   �� *
Location+6\     5;      $ 
Start Time��6-   $	 * 6_   
 6A   �� *	StartTime+6_     5<      $ End Time��6-   $	 * 6[   
 6?   �� *	EndTime+6[   5>      5?      5@      5A      5B      